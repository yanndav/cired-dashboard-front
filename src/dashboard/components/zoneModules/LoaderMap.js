import ContentLoader from "react-content-loader";

const LoaderMap = (props) => (
  <ContentLoader
    speed={2}
    width={400}
    height={400}
    viewBox="0 0 400 400"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="2" y="11" rx="0" ry="0" width="86" height="32" />
    <rect x="4" y="57" rx="0" ry="0" width="389" height="333" />
  </ContentLoader>
);

export default LoaderMap;
