export default function About() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-2xl mx-auto p-3 text-center">
        <div>
          <h1 className="text-3xl font font-semibold text-center my-7">
            About Mehmet`s Projects
          </h1>
          <div className="text-md text-gray-500 flex flex-col gap-6">
            <p>
              Welcome to my Projects, a platform showcasing my expertise in both
              Full-Stack MERN and Java Backend development. Here, you’ll find a
              range of projects demonstrating my skills in MongoDB, Express.js,
              React, Node.js, as well as Java Backend solutions using Spring
              Boot.
            </p>
            <p>
              In addition to my work with MERN and Java, I’ve also gained
              experience in Kubernetes for container orchestration and
              deployment, ensuring scalability and reliability in production
              environments. I specialize in building scalable microservices with
              an event-driven architecture, leveraging technologies like Kafka
              and event buses for smooth communication.
            </p>

            <p>
              I’ve expanded my capabilities beyond traditional web development
              to include mobile applications built with React Native, delivering
              high-quality, full-stack solutions. These projects reflect my
              hands-on approach to building efficient, scalable systems using
              the latest technologies.
            </p>

            <p>
              Thank you for visiting my site. I hope you find my projects both
              informative and inspiring. As I continue to evolve as a developer,
              I look forward to sharing more of my work with you.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
