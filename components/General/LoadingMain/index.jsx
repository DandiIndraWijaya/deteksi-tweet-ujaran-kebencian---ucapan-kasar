// This handle main loading component
import { Typography } from '@material-ui/core';

function LoadingMain(props) {
  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffff',
      }}
    >
      <img
        src="/assets/logo_twitter.png"
        alt="Logo twitter"
        className="imageMainLoading"
        style={{ width: 300 }}
      />
      <center>
        <Typography variant="h3" style={{ color: '#1DA1F2' }}>  Deteksi Tweet Ujaran Kebencian dan Ucapan Kasar Berbahasa Indonesia</Typography>
      </center>
      {/* <img className={'imageMainLoading'} src="/assets/logo.png" alt="" /> */}
    </div>
  );
}

export default LoadingMain;
