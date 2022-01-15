import { Link } from 'react-router-dom';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import heroImg from '../../assets/images/heroImg.jpg';
import samsungLogo from '../../assets/images/samsung-logo.svg';
import realmeLogo from '../../assets/images/realme.svg';
import lgLogo from '../../assets/images/lg.jpg';
import miLogo from '../../assets/images/Xiaomi.png';
import appleLogo from '../../assets/images/Apple.jpg';
import boatLogo from '../../assets/images/boat.png';

import Slide from './Slide';
import BrandCard from './BrandCard';
import CategoryCard from './CategoryCard';

const categories = [
  {
    category: 'Televisions',
    categoryFilter: 'TV',
    image:
      'https://res.cloudinary.com/dl7eqoydv/image/upload/v1640660337/electro-store/55up7500ptz-55up7500ptz-lg-original-imag4q3zjqgshdhy_qsdpky.jpg'
  },
  {
    category: 'Mobile',
    categoryFilter: 'Mobile',
    image:
      'https://res.cloudinary.com/dl7eqoydv/image/upload/v1640660335/electro-store/c11-2021-rmx3231-realme-original-imag4j4xkqchhfxk_kkfhjq.jpg'
  },
  {
    category: 'Washing Machines',
    categoryFilter: 'Washing Machines',
    image:
      'https://res.cloudinary.com/dl7eqoydv/image/upload/v1641548038/electro-store/wa65a4002vs-tl-samsung-original-imafvgz4vazcnbke_bnuidj.jpg'
  },
  {
    category: 'Laptops',
    categoryFilter: 'Laptops',
    image:
      'https://res.cloudinary.com/dl7eqoydv/image/upload/v1641548820/electro-store/apple-macbook-air-m1-13-3-inch-lightwings-original-imag3gh5xftgbpg3_hbngdi.jpg'
  },
  {
    category: 'Headphones',
    categoryFilter: 'Headphones',
    image:
      'https://res.cloudinary.com/dl7eqoydv/image/upload/v1641549417/electro-store/rockerz-255f-rockerz-255-boat-original-imag66ckxprfrsz2_ornf4q.jpg'
  }
];

const brands = [
  { name: 'SAMSUNG', image: samsungLogo },
  { name: 'realme', image: realmeLogo },
  { name: 'LG', image: lgLogo },
  { name: 'Mi', image: miLogo },
  { name: 'Apple', image: appleLogo },
  { name: 'boAt', image: boatLogo }
];

function Home() {
  return (
    <div>
      <div
        style={{
          backgroundSize: 'cover',
          backgroundImage: `url(${heroImg})`,
          backgroundPosition: 'center center'
        }}
        className="h-80 grid place-content-center"
      >
        <Link
          to="/shop"
          className="text-white text-lg py-3 px-4 bg-indigo-700 hover:bg-indigo-800 rounded-md mt-40"
        >
          Shop Now
        </Link>
      </div>

      <div className="mt-28">
        <div className="flex flex-col items-center justify-center mb-10">
          <h1 className=" text-3xl md:text-4xl font-semibold ">Categories</h1>
          <div className="border-2 border-indigo-700 mt-3 md:mt-4 w-24 md:w-28" />
        </div>

        <Slide>
          {categories?.map((category) => (
            <CategoryCard
              key={category?.category}
              category={category?.category}
              categoryFilter={category?.categoryFilter}
              image={category?.image}
            />
          ))}
        </Slide>
      </div>

      <div className="mt-28">
        <div className="flex flex-col items-center justify-center mb-10">
          <h1 className=" text-3xl md:text-4xl font-semibold ">Brands</h1>
          <div className="border-2 border-indigo-700 mt-3 md:mt-4 w-14 md:w-16" />
        </div>
        <Slide>
          {brands?.map((brand) => (
            <BrandCard
              key={brand?.name}
              brandName={brand?.name}
              image={brand?.image}
            />
          ))}
        </Slide>
      </div>
    </div>
  );
}

export default Home;
