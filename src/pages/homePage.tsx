import homeImage from '../assets/img/crud-home.svg';

export default function HomePage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 pt-[6rem]">
      <img src={homeImage} alt="CRUD Home" className="max-w-[600px] w-full" />
    </div>
  );
}
