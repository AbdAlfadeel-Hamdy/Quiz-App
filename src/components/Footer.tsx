interface FooterProps {
  children: React.ReactNode;
}

const Footer: React.FC<FooterProps> = ({ children }) => {
  return <footer>{children}</footer>;
};

export default Footer;
