import { Link } from "react-router-dom";

export default function Header({
  heading,
  paragraph,
  linkName,
  linkUrl = "#",
}) {
  return (
    <div className="mb-10">
      <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
        {heading}
      </h2>
      <p className="mt-2 text-sm text-center text-gray-600 ">
        {paragraph}{" "}
        <Link
          to={linkUrl}
          className="font-medium text-purple-600 hover:text-purple-500">
          {linkName}
        </Link>
      </p>
    </div>
  );
}
