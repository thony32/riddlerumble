import ReactPlayer from 'react-player';

const TutoVideo = () => {
  return (
    <div className="flex justify-center">
      <div className="stack">
        <div className="card shadow-md bg-primary text-primary-content">
          <ReactPlayer url='https://www.youtube.com/watch?v=6y9rMxzu-HY' />
        </div>
        <div className="card shadow bg-primary text-primary-content">
          <div className="card-body">
            <h2 className="card-title">Notification 2</h2>
          </div>
        </div>
        <div className="card shadow-sm bg-primary text-primary-content">
          <div className="card-body">
            <h2 className="card-title">Notification 3</h2>
            <p>You have 3 unread messages. Tap here to see.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TutoVideo
