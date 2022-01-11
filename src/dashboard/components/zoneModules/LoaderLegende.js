import ContentLoader from "react-content-loader";

const LoaderLegende = (props) => (
  <ContentLoader
    speed={2}
    width={600}
    height={200}
    viewBox="0 0 600 200"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="2" y="25" rx="0" ry="0" width="550" height="11" />
    <rect x="2" y="55" rx="0" ry="0" width="545" height="11" />
    <rect x="2" y="85" rx="0" ry="0" width="549" height="11" />
    <rect x="2" y="115" rx="0" ry="0" width="550" height="11" />
    <rect x="2" y="145" rx="0" ry="0" width="545" height="11" />
  </ContentLoader>
);

export default LoaderLegende;
