import { useState } from "react";
import InfinityScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import useVideoList from "../hooks/useVideoList";
import classes from "../styles/Videos.module.css";
import Video from "./Video";
export default function Videos() {
  const [page, setPage] = useState(1);
  const { loading, error, videos, hasMore } = useVideoList(page);
  return (
    <div>
      {videos.length > 0 && (
        <InfinityScroll
          className={classes.videos}
          dataLength={videos.length}
          hasMore={hasMore}
          // loader={<h4 className="center">Loading...</h4>}
          next={() => setPage(page + 8)}
        >
          {videos.map((video) =>
            video.noq > 0 ? (
              <Link to={`/quiz/${video.youtubeID}`}  state={
                {videoTitle:video.title}
              } key={video.youtubeID}>
                <Video
                  key={video.youtubeID}
                  title={video.title}
                  id={video.youtubeID}
                  noq={video.noq}
                />
              </Link>
            ) : (
              <Video
                key={video.youtubeID}
                title={video.title}
                id={video.youtubeID}
                noq={video.noq}
              />
            )
          )}
        </InfinityScroll>
      )}

      {!loading && videos.length === 0 && <h2>No Data Found</h2>}
      {error && <h2>There was an error</h2>}
      {loading && <h2 className="center">loading...</h2>}
    </div>
  );
}
