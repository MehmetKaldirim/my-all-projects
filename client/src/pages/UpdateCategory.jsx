import { Alert, Button, TextInput } from "flowbite-react";

import { useState, useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";

export default function UpdateCategory() {
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const navigate = useNavigate();
  const { categoryId } = useParams();

  useEffect(() => {
    try {
      const fetchCategory = async () => {
        const res = await fetch(`/api/category/getCategoryById/${categoryId}`);
        const data = await res.json();
        if (!res.ok) {
          console.log(data.message);
          setPublishError(data.message);
          return;
        }
        if (res.ok) {
          console.log(data);
          setPublishError(null);
          setFormData(data);
        }
      };

      fetchCategory();
    } catch (error) {
      console.log(error.message);
    }
  }, [categoryId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/category/update/${formData._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        navigate("/dashboard?tab=categories");
      }
    } catch (error) {
      setPublishError("Something went wrong");
    }
  };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">
        Create a Category
      </h1>
      <form
        className="flex gap-10 mx-auto justify-center items-center"
        onSubmit={handleSubmit}
      >
        <TextInput
          type="text"
          placeholder="Title"
          required
          id="title"
          className="flex-1"
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          value={formData.title}
        />

        <Button type="submit" gradientDuoTone="tealToLime">
          Publish
        </Button>
        {publishError && (
          <Alert className="mt-5" color="failure">
            {publishError}
          </Alert>
        )}
      </form>
    </div>
  );
}
