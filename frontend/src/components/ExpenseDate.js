import React from 'react';
import Navbar from './navbar';

const ExpenseDate = () => {
  const dateData = {
    dates: [
      {
        fullDate: '2024-03-15',
        event: 'Project Kickoff',
        description: 'Initial team meeting'
      },
      {
        fullDate: '2024-04-22',
        event: 'Product Review',
        description: 'Quarterly product assessment'
      },
      {
        fullDate: '2024-05-10',
        event: 'Client Presentation',
        description: 'Major client pitch'
      },
      {
        fullDate: '2024-06-05',
        event: 'Team Building',
        description: 'Annual team workshop'
      },
      {
        fullDate: '2024-07-20',
        event: 'Product Launch',
        description: 'New product release'
      },
      {
        fullDate: '2024-08-15',
        event: 'Annual Conference',
        description: 'Yearly industry gathering'
      },{
        fullDate: '2024-08-15',
        event: 'Annual Conference',
        description: 'Yearly industry gathering'
      },
     
     
      
    ]
  };

  return (
    <>
    <Navbar/>
    <div className="
      min-h-screen 
      w-full 
      bg-gradient-to-br 
      from-blue-600/90 
      to-purple-600/90 
      overflow-x-hidden
      flex 
      items-center 
      justify-center
    "
    >
      <div className="
        container 
        mx-auto 
        px-4 
        py-12 
        md:px-8 
        lg:px-16
      "
      style={{ marginTop: dateData.dates.length > 6 ? '90px' : '0px' }}
      >
        <div className="
          grid 
          grid-cols-2 
          sm:grid-cols-3 
          md:grid-cols-4 
          lg:grid-cols-5 
          xl:grid-cols-6 
          gap-4 
          md:gap-6 
          lg:gap-8
        ">
          {dateData.dates.map((dateItem, index) => {
            const date = new Date(dateItem.fullDate);
            
            return (
              <div 
                key={index} 
                className="
                  w-full 
                  bg-white/15 
                  backdrop-blur-lg 
                  rounded-2xl 
                  p-4 
                  md:p-6 
                  flex 
                  flex-col 
                  justify-center 
                  items-center 
                  text-center 
                  transform 
                  transition-all 
                  duration-500 
                  hover:scale-105 
                  hover:shadow-2xl
                  shadow-lg
                  border 
                  border-white/20
                  group
                  relative 
                  overflow-hidden
                  cursor-pointer
                "
                onClick={()=>{console.log(dateItem)}}
              >
                {/* Animated gradient overlay */}
                <div className="
                  absolute 
                  inset-0 
                  bg-gradient-to-br 
                  from-white/10 
                  to-white/5 
                  opacity-0 
                  group-hover:opacity-100 
                  transition-opacity 
                  duration-500 
                  z-0
                "></div>
                
                {/* Date Number */}
                <div className="
                  text-4xl 
                  md:text-5xl 
                  lg:text-6xl 
                  font-bold 
                  text-white 
                  mb-2
                  drop-shadow-lg
                  relative
                  z-10
                  transform 
                  transition-transform 
                  group-hover:-translate-y-2
                ">
                  {date.getDate()}
                </div>
                
                {/* Month and Year */}
                <div className="
                  text-sm 
                  md:text-base 
                  font-medium 
                  text-white/80 
                  uppercase 
                  tracking-wider
                  relative
                  z-10
                  transform 
                  transition-transform 
                  group-hover:scale-105
                ">
                  {date.toLocaleString('default', { month: 'short' })} {date.getFullYear()}
                </div>
                
                {/* Weekday */}
                <div className="
                  text-xs 
                  md:text-sm 
                  text-white/70 
                  mt-1
                  mb-3
                  relative
                  z-10
                  opacity-0
                  group-hover:opacity-100
                  transition-opacity
                ">
                  {date.toLocaleString('default', { weekday: 'long' })}
                </div>
                
                {/* Event Details */}
                <div className="
                  bg-white/20 
                  text-white 
                  rounded-xl 
                  p-2 
                  md:p-3 
                  mt-3 
                  text-xs
                  opacity-0 
                  group-hover:opacity-100 
                  transition-all
                  duration-500
                  transform
                  group-hover:translate-y-0
                  translate-y-4
                  relative
                  z-10
                  w-full
                ">
                  <p className="font-semibold mb-1 text-xs md:text-sm">{dateItem.event}</p>
                  <p className="text-xs text-white/80">{dateItem.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
    </>
  );
};

export default ExpenseDate;