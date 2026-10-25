import Image from 'next/image';

const Footer = () => {

    return (
        <div className='border-t border-gray-500 mt-10 justify-end'>
            <div className='container mx-auto p-5 flex justify-between'>
                <div>
                    <Image src="/logo.png" alt="Logo" width={30} height={30} className="object-contain" />
                </div>
                <div>
                    <h2 className='text-gray-600'>© 2026 FitLog — Workout Library. Train hard, log honest.</h2>
                </div>
            </div>
        </div>
    );
};

export default Footer;