import PropTypes from "prop-types";

export default function IFrameDisplay({ url, name }) {
  return (
    <div
      className="h-full w-full"
      dangerouslySetInnerHTML={{
        __html: `<iframe src=${url} title=${name} style="height: 100%; minHeight: 400px; width: 100%" />`,
      }}
    />
  );
}

IFrameDisplay.propTypes = {
  url: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
