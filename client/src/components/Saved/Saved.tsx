import { FC, useEffect, useState } from "react";
import api from "../../api";
import { useNavigate } from "react-router-dom";

interface Props {
  size: number;
  contentId: string;
  username: string;
}

const Saved: FC<Props> = ({ size, contentId, username }) => {
  const [isSaved, setIsSaved] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkIsSaved = async () => {
      setIsSaved(await api.get(`/saved/isSaved/${contentId}/${username}`));
    };
    checkIsSaved();
  }, [contentId, username]);

  const handleClick = async () => {
    if (!username) navigate("/");
    const originalIsSaved = isSaved;
    const newIsSaved = !originalIsSaved;
    setIsSaved(newIsSaved);

    try {
      if (newIsSaved) {
        console.log("saveuju");
        await api.post(`/saved/create/${contentId}/${username}`);
      } else {
        await api.delete(`/saved/delete/${contentId}/${username}`);
      }
    } catch (error) {
      setIsSaved(originalIsSaved);
    }
  };

  return (
    <button onClick={handleClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        width={size}
        height={size}
        viewBox="0 0 256 256"
        xmlSpace="preserve"
      >
        <g
          transform="translate(1.4066 1.4066) scale(2.81 2.81)"
          style={{
            stroke: "none",
            strokeWidth: 1,
            fill: "none",
            fillRule: "nonzero",
            opacity: 1,
          }}
        >
          <path
            d="M72.481 90c-1.061 0-2.1-0.387-2.938-1.133l-22.98-20.436a2.23 2.23 0 0 0-3.125.001L20.458 88.867c-1.326 1.181-3.155 1.459-4.776 0.734-1.619-0.728-2.624-2.281-2.624-4.055V6.762C13.057 3.034 16.09 0 19.819 0h50.363c3.728 0 6.761 3.034 6.761 6.762v78.784c0 1.774-1.006 3.328-2.625 4.055a2.71 2.71 0 0 1-1.837.399zM72.201 85.879c0.143 0.125 0.303 0.15 0.479 0.073 0.174-0.078 0.263-0.215 0.263-0.406V6.762c0-1.523-1.239-2.762-2.761-2.762H19.819c-1.523 0-2.762 1.239-2.762 2.762v78.784c0 0.191 0.088 0.328 0.263 0.406 0.174 0.076 0.336 0.053 0.479-0.073l23.98-20.436a6 6 0 0 1 8.44-.001l23.982 20.437z"
            fill="black"
            stroke="black"
            strokeWidth={isSaved ? 5 : 0}
          />
        </g>
      </svg>
    </button>
  );
};

export default Saved;
