import ReactPlayer from 'react-player'

const TutoVideo = () => {
  return (
    <div>
      <div className='flex justify-center'>
        <ReactPlayer width="75%" height="75dvh" url='https://www.youtube.com/watch?v=6y9rMxzu-HY&pp=ygUSZGFucyB0b24gY3VsIGphbWVs' />
      </div>
    </div>
  )
}

export default TutoVideo