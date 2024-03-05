const PageNotFound = () => {
  return (
    <>
      <div
        className="row"
        style={{
          minHeight: "100vh",
          backgroundImage: 'url("images/pagenotfound.webp")',
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          display: "flex",
          flexDirection: "column",
        }}
      ></div>
    </>
  );
};

export default PageNotFound;
