export const CurrentDate = () => {
  return (
    <h1 className="text-2xl font-medium text-center">
      {new Date().toLocaleDateString("en-ie", {
        weekday: "long",
        month: "long",
        day: "numeric",
      })}
    </h1>
  );
};
