function Tags(props) {
  if (props.tags === undefined) return;
  const tags = props.tags;
  return (
    <div className="flex gap-2 flex-wrap">
      {tags.map((tag, index) => (
        <button key={index} className="btn btn-xs btn-primary">
          {tag.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
export default Tags;
