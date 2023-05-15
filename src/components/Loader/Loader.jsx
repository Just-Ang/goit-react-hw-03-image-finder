import { BallTriangle } from 'react-loader-spinner';

export const Loader = () => (
    <div style={{
        marginLeft: 'auto',
        marginRight: 'auto',
      }}>
        <BallTriangle
  height={300}
  width={300}
  radius={5}
  color="#4fa94d"
  ariaLabel="ball-triangle-loading"
  wrapperClass={{}}
  wrapperStyle=""
  visible={true}

/>
    </div>
);