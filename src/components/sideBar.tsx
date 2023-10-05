import React from 'react'

function SideBar({navItem , activePage , handleTabChange}) {
  return (
    <aside className="bg-white border-r-[#272727] shadow-2xl border-[1px] min-w-[18rem] h-full flex flex-col gap-3">
    {navItem.map((item, index) => (
      <div
        className={`flex flex-row gap-2 items-center pl-6 ${activePage === item.id
          ? "text-white bg-[#0C5AA8] shadow-2xl rounded"
          : "text-[#272727]"
          } p-2 cursor-pointer`}
        onClick={() => handleTabChange(item.id)}
      >
        <img src={item.image} alt="Navicons" className={`h-[20px] w-[20px] ${activePage === item.id ? "" : "invert"}`} />
        {item.name}
      </div>
    ))}
  </aside>
  )
}

export default SideBar