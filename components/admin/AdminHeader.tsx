import Link from "next/link";
import { PlusIcon } from "@heroicons/react/24/outline";

interface Props {
  title: string;
  description: string;
  buttonText?: string;
  buttonHref?: string;
}

export default function AdminHeader({ title, description, buttonText, buttonHref }: Props) {
  return (
    <div className="md:flex md:items-center md:justify-between">
      <div className="min-w-0 flex-1">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          {title}
        </h2>
        <p className="mt-1 text-sm text-gray-500">{description}</p>
      </div>
      {buttonText && buttonHref && (
        <div className="mt-4 flex md:ml-4 md:mt-0">
          <Link
            href={buttonHref}
            className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
            {buttonText}
          </Link>
        </div>
      )}
    </div>
  );
} 