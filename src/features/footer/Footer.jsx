import { Link } from 'react-router-dom';
import githubLogo from '../../assets/GitHub-Mark-64px.png';

function Footer() {
  return (
    <div className="mt-28 bg-white flex flex-col items-center justify-center px-4 py-8 text-gray-800 font-semibold shadow-custom-2">
      <p>Made with Reactjs by Kousik Manna</p>
      <a className="mt-2" href="https://github.com/imkousik9" target="_blank">
        <img src={githubLogo} alt="Github" className="object-contain h-10" />
      </a>
    </div>
  );
}

export default Footer;
