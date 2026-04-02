
interface DataViewerProps {
  data: any;
}

const DataViewer = ({ data }: DataViewerProps) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {data.map((item: any, index: number) => (
        <div
          className=" bg-[#f0f0f0] p-2 rounded-md"
          key={index.toString()}
        >
          <p className="text-sm font-bold">{item.label}</p>
          {/* <p className="text-sm">{item.value === null ? "null" : item.value}</p> */}
          <p className="text-sm">{String(item.value)}</p>
        </div>
      ))}
    </div>
  );
};

export default DataViewer;