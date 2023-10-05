import { useNavigate } from "react-router-dom";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

function Navbar({user}) {
    const navigate = useNavigate();
    return (
        <nav className="fixed top-0 bg-[#272727] shadow-2xl max-h-[80px] w-full p-[16px] flex flex-row justify-between px-[30px]">
            <div className="flex items-center gap-2">
                <img src="../../public/logo.png" alt="logo" className="h-[34px] w-[34px]" />
                <h1 className="text-white text-[2rem] font-bold">OLOID</h1>
            </div>
  
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <img
                        src={user?.Faces[0] === undefined ? "../../public/assets/avatar.svg" : user?.Faces[0]?.SignedUrl}
                        className="min-h-[50px] min-w-[50px] max-h-[50px] max-w-[50px] rounded-full shadow-xl border-[2px] border-[#0C5AA8] p-1"
                        alt="profile image"
                    />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="mr-[20px] mt-[10px]">
                    <DropdownMenuLabel>{user?.DisplayName}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        onClick={() => navigate("/home/profile")}
                    >
                        Profile
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        onClick={() => {
                            localStorage.clear();
                            navigate("/")
                        }}
                    >
                        <div className="flex flex-row gap-1 items-center">
                            <img src="../../public/assets/util/logout.svg" alt="logout icon" className="h-[20px] w-[20px]" />
                            <p>Logout</p>
                        </div>

                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </nav>
    )
}

export default Navbar