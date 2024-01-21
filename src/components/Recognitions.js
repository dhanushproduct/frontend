import React from "react";
import "../App.css";

export default function Recognitions() {
  const strr =
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit, eveniet? Similique dignissimos reiciendis cumque vero aperiam quis iste distinctio in, animi itaque nihil quia, repellendus corrupti quae. Harum, earum blanditiis sit neque quaerat quis maxime veritatis esse iusto fugiat numquam obcaecati libero ipsa officia placeat dicta perferendis aut inventore magni. Doloremque, placeat odio esse, aspernatur ducimus ipsam fugiat nulla amet, dolor totam voluptatem saepe a libero eius adipisci omnis? Totam iusto beatae doloribus exercitationem dolor adipisci excepturi aperiam expedita facilis, sit nihil necessitatibus delectus reprehenderit libero voluptatibus. Impedit recusandae quaerat veritatis aliquid ex ea quae rem, a quibusdam sapiente sit?";
  return (
    <div className=" p-4 my-2 space-y-2 w-full bg-white rounded-xl ">
      
                
                
                
        <h3 className="text-lg font-medium text-gray-900 p-4">Recognitions</h3>
      <div className=" flex gap-4">
        <div className="h-[50px]  aspect-square bg-slate-400"></div>
        <div>
          <h1>Title</h1>
          {/* <p className='text-sm'>company</p>
        <p className='text-sm text-gray-600'>from - to</p> */}
          {/* <p className=''> <b>
          skills:
          </b>
           a, b, c</p> */}
          <div className=" text-justify md:pr-4  text-sm md:text-md textfont">
            {strr.substring(0, 500)}
          </div>
        </div>
      </div>
      {/* <div className='w-full flex justify-center my-4'>

    <div className='h-[2px] bg-slate-200 w-[95%]'></div>
    </div> */}
      <hr className=" text-center w-[95%] mt-4" />
    </div>
  );
}
