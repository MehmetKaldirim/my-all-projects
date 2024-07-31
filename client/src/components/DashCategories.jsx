import { Modal, Table, Button, Alert } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function DashCategories() {
  const { currentUser } = useSelector((state) => state.user);
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [publishError, setPublishError] = useState(null);
  const [categoryIdToDelete, setCategoryIdToDelete] = useState("");
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`/api/category/`);
        const data = await res.json();

        if (!res.ok) {
          setPublishError(data.message);
          return;
        }

        if (res.ok) {
          setCategories(data.categories);
        }
      } catch (error) {
        setPublishError(data.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchCategories();
    }
  }, [currentUser._id]);

  const handleDeleteCategory = async () => {
    setShowModal(false);
    try {
      console.log("delte begin");
      const res = await fetch(`/api/category/delete/${categoryIdToDelete}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
        setPublishError(data.message);
      } else {
        setPublishError(null);
        setCategories((prev) =>
          prev.filter((category) => category._id !== categoryIdToDelete)
        );
      }
    } catch (error) {
      console.log(error.message);
      setPublishError(data.message);
    }
  };

  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {currentUser.isAdmin && categories.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>Date updated</Table.HeadCell>
              <Table.HeadCell>Category title</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
              <Table.HeadCell>
                <span>Edit</span>
              </Table.HeadCell>
            </Table.Head>
            {categories.map((category) => (
              <Table.Body className="divide-y" key={category._id}>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>
                    {new Date(category.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>{category.title}</Table.Cell>
                  <Table.Cell>
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setCategoryIdToDelete(category._id);
                      }}
                      className="font-medium text-red-500 hover:underline cursor-pointer"
                    >
                      Delete
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      className="text-teal-500 hover:underline"
                      to={`/update-category/${category._id}`}
                    >
                      <span>Edit</span>
                    </Link>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
        </>
      ) : (
        <p>You have no categories yet!</p>
      )}

      {publishError && (
        <Alert className="mt-5" color="failure">
          {publishError}
        </Alert>
      )}

      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this category?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteCategory}>
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
