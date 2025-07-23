import Footer from "../components/storefront/Footer";
import Nav from "../components/storefront/Nav";

export default function PublicLayout({ children }) {
  const routes = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/product', label: 'Products' },
    { href: '/contact', label: 'Contact' },
    { href: '/checkout', label: 'Cart' },
    
  ]
  return (
    <div >
     
    <Nav
    routes={routes}
    />
      {children}
    <Footer/>
    </div>
  );
}
