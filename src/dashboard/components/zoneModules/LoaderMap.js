import ContentLoader from "react-content-loader";

const LoaderMap = (props) => (
  <ContentLoader
    speed={2}
    width={600}
    height={500}
    viewBox="0 0 600 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="2" y="11" rx="0" ry="0" width="86" height="32" />
    <rect x="2" y="57" rx="0" ry="0" width="550" height="400" />
  </ContentLoader>
);

export default LoaderMap;
