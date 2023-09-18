export default function Loader({ count = 1 }: { count: number }) {
  return Array(count)
    .fill(count)
    .map((_, key) => (
      <div className="w-full h-20 bg-gray-100 mb-4 p-2" key={key}>
        <div className="w-20 mb-2 p-2 px-4 bg-gray-200 animate-pulse"></div>
        <div className="w-full p-2 px-4 bg-gray-200 animate-pulse"></div>
      </div>
    ));
}
