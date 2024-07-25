import { Button } from "flowbite-react";

export default function CallToAction() {
  return (
    <div className="flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center">
      <div className="flex-1 justify-center flex flex-col">
        <h2 className="text-2xl">Want to learn more about MERN?</h2>
        <p className="text-gray-500 my-2">Checkout my blog page</p>
        <Button
          gradientDuoTone="tealToLime"
          className="rounded-tl-xl rounded-bl-none"
        >
          <a
            //href="https://www.100jsprojects.com"
            href="http://my-blog-5180-eecfdc018cd7.herokuapp.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            My Blog
          </a>
        </Button>
      </div>
      <div className="p-7 flex-1">
        <img src="https://almablog-media.s3.ap-south-1.amazonaws.com/MERN_Stack_9437df2ba9_62af1dd3fc.png" />
      </div>
    </div>
  );
}
