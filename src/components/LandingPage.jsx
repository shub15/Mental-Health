import React from 'react'
import image4 from "../assets/image4.png";
import search from "../assets/search.png";
import robot from "../assets/robot.png";
import clipboard from "../assets/clipboard.png";
import hero from "../assets/hero.png";

const LandingPage = () => {

	return (
		<div>
			<div>
				<div className='flex justify-between p-12 text-2xl'>
					<div>
						<div className='font-semibold text-4xl'>
							<h1 className=''>
								Feeling Better
							</h1>
							<h1>
								starts with a single message
							</h1>
						</div>
						<h2 className='py-8 text-lg'>
							Much more than live sessions and messaging . A complete happiness toolbox! Get matched with the qualified
							therapist.
						</h2>
						<div className=''>
							<button className='bg-[#ADE0C8] px-10 py-4 mr-10 rounded-full'>Individual Therapy</button>
							<button className='bg-[#ADE0C8] px-10 py-4 rounded-full'>Solutions from AI</button>
						</div>
					</div>
					<img src={hero} alt="hero" />
				</div>
				<div className='bg-[#ADE0C8] px-40 py-12 text-center'>
					<div className='mx-24 space-y-14 text-[#490F00]'>
						<div className='font-semibold text-5xl'>
							Connect with Licensed Therapists, Access Personalized Care, and Start Your Journey to Wellness.
						</div>
						<div className=''>
							Welcome to (app ka naam), the platform that helps you find licensed therapists, access personalized care, and enhance your well-being.  With our innovative features, you can easily connect with compassionate professionals, receive tailored support, get solutions from Ai, solve your problems and embark on a path to mental wellness.
						</div>
						<div className='flex justify-around items-center font-semibold text-3xl'>
							<div className='flex flex-col justify-center w-24'>
								<img src={search} alt="search" className='pt-4' />
								<p className='pt-8'>Find Therapy Experts</p>
							</div>
							<div className='flex flex-col justify-center w-24'>
								<img src={robot} alt="ai" className='' />
								<p className='pt-16'>Chat with AI</p>
							</div>
							<div className='flex flex-col justify-center w-24'>
								<img src={clipboard} alt="clipboard" />
								<p className='pt-8'>A Better Aid</p>
							</div>
						</div>
					</div>
				</div>
				<div>
					<div className='flex items-center py-16 px-32'>
						<img src={image4} alt="user-chat" />
						<div className='ml-48 pl-32 text-center font-semibold'>
							<div className='text-5xl pb-12'>
								Meet Your Virtual Therapist
							</div>
							<div className='text-2xl'>
								Our chatbot is here to listen to your concerns, provide thoughtful insights, and guide you towards helpful solutions. Whether you're seeking advice or just someone to talk to, we're here to support you.
							</div>
						</div>
					</div>
					<div className='flex items-center pb-16 px-32'>
						<div className='mr-48 pr-32 text-center font-semibold'>
							<div className='text-5xl pb-12'>
								Personalized Therapist
							</div>
							<div className='text-2xl'>
								Beyond our virtual support, you can also speak directly with licensed therapists to receive personalized advice and prescriptions tailored to your needs.".
							</div>
						</div>
						<img src={image4} alt="user-chat" />
					</div>
				</div>
			</div>
		</div>
	);
};

export default LandingPage;