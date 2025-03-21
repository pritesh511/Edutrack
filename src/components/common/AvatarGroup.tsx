import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface AvatarGroupProps {
  users: { id: string; name: string; image?: string }[];
}

const AvatarGroup: React.FC<AvatarGroupProps> = ({ users }) => {
  return (
    <div className="flex items-center space-x-[-10px]">
      {users.map((user) => (
        <Avatar key={user.id} className="w-10 h-10 border-2 border-white">
          <AvatarImage src={user.image} alt={user.name} />
          <AvatarFallback className="text-sm">
            {user.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()}
          </AvatarFallback>
        </Avatar>
      ))}
    </div>
  );
};

export default AvatarGroup;
