"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PageNotFound = () => {
    return (<>
      <div className="row" style={{
            minHeight: "100vh",
            backgroundImage: 'url("images/pagenotfound.webp")',
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
            display: "flex",
            flexDirection: "column",
        }}></div>
    </>);
};
exports.default = PageNotFound;
