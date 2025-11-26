export default function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} Kettle Moraine Professional Cleaners. All rights reserved.</p>
      <p className="credit">
        Website by{" "}
        <a
          href="https://zhowellportfolio.netlify.app/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Zach Howell
        </a>
      </p>
    </footer>
  );
}
