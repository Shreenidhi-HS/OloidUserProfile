import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "./menubar";

interface Navbarprops {
  handleTabChange: (id: number) => void;
  activePage: number;
}
const Navigationbar = ({ handleTabChange }: Navbarprops) => {
  return (
    <div className="absolute top-[0.875rem] right-[0.688rem]">
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>
            <img src="/assets/hamburger.svg" alt="menu" />
          </MenubarTrigger>
          <MenubarContent className="bg-white">
            <MenubarItem onClick={() => handleTabChange(2)}>
              Credentials
            </MenubarItem>
            <MenubarItem onClick={() => handleTabChange(1)}>
              Profile
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Logout</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  );
};

export default Navigationbar;
