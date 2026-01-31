// UserProfile.tsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Tabs, Skeleton, Button, message } from "antd";
import type { TabsProps } from "antd";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUserPlus,
  FaEnvelope,
  FaCheck,
} from "react-icons/fa";
import { useQueryHandler } from "../hooks/useQuery/UseQuery";
import coverImg from "../assets/images/1641858083_1-abrakadabra-fun-p-krasivii-fon-dlya-zastavki-1.jpg";

const DEFAULT_COVER =
  "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=1287&auto=format&fit=crop";
const DEFAULT_AVATAR = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

interface UserProfileType {
  _id: string;
  name: string;
  surname: string;
  username: string;
  profile_photo?: string;
  cover_photo?: string;
  bio?: string;
  address?: string;
  created_at: string;
  followers: string[];
  following?: string[];
  user_type?: string;
  wishlist?: any[];
}

const AboutTab: React.FC<{ user: UserProfileType }> = ({ user }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
    <h3 className="text-lg font-bold text-gray-800 mb-4">About Me</h3>
    <p className="text-gray-600 mb-6 leading-relaxed">
      {user.bio || "This user hasn't written a bio yet."}
    </p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="flex items-center gap-3 text-gray-600">
        <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-[#46A358]">
          <FaMapMarkerAlt />
        </div>
        <div>
          <p className="text-xs text-gray-400">Location</p>
          <p className="font-medium">{user.address || "Unknown"}</p>
        </div>
      </div>
      <div className="flex items-center gap-3 text-gray-600">
        <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-[#46A358]">
          <FaCalendarAlt />
        </div>
        <div>
          <p className="text-xs text-gray-400">Joined Date</p>
          <p className="font-medium">
            {new Date(user.created_at).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  </div>
);

const ProductsTab: React.FC<{ userId: string }> = ({ userId }) => {
  const { data, isLoading } = useQueryHandler({
    url: `flower/category/all/${userId}?category=all`,
    pathname: `user-products-${userId}`,
  });

  if (isLoading) return <Skeleton active />;

  if (!data || (Array.isArray(data) && data.length === 0))
    return <p className="text-gray-500">No products found</p>;

  const items = Array.isArray(data) ? data : [data];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {items.map((item: any) => (
        <div
          key={item._id}
          className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100"
        >
          <div className="h-48 bg-gray-100 relative">
            <img
              src={item.main_image || "https://via.placeholder.com/300"}
              alt={item.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-4">
            <h4 className="font-bold text-gray-800 truncate">{item.title}</h4>
            <p className="text-[#46A358] font-bold mt-1">${item.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

const PostsTab: React.FC<{ userId: string }> = ({ userId }) => {
  const { data, isLoading } = useQueryHandler({
    url: `user/blog?created_by=${userId}`,
    pathname: `user-posts-${userId}`,
  });

  if (isLoading) return <Skeleton active />;

  if (!data || (Array.isArray(data) && data.length === 0))
    return <p className="text-gray-500">No posts found</p>;

  const items = Array.isArray(data) ? data : [data];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {items.map((item: any) => (
        <div
          key={item._id}
          className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100"
        >
          <div className="p-4">
            <h4 className="font-bold text-gray-800 truncate">{item.title}</h4>
            <p className="text-gray-500 text-sm mt-1 truncate">
              {item.short_description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

const LikesTab: React.FC<{ userId: string }> = ({ userId }) => {
  return <div>Likes Tab for user {userId}</div>;
};

const FollowersTab: React.FC<{
  followerIds: string[];
  currentUser: UserProfileType;
}> = ({ followerIds, currentUser }) => {
  const [followers, setFollowers] = useState<
    { _id: string; username?: string; profile_photo?: string }[]
  >([]);

  useEffect(() => {
    const fetchFollowers = async () => {
      const results = await Promise.all(
        followerIds.map(async (id) => {
          if (id === currentUser._id) {
            return {
              _id: currentUser._id,
              username: currentUser.username,
              profile_photo: currentUser.profile_photo,
            };
          }
          try {
            const res = await fetch(`/api/user/by_id/${id}`);
            if (!res.ok) throw new Error("Failed");
            const data = await res.json();
            return {
              _id: data._id,
              username: data.username,
              profile_photo: data.profile_photo,
            };
          } catch {
            return { _id: id, username: "Unknown", profile_photo: "" };
          }
        }),
      );
      setFollowers(results);
    };
    fetchFollowers();
  }, [followerIds, currentUser]);

  if (!followers.length) return <Skeleton active />;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {followers.map((f) => (
        <div
          key={f._id}
          className="bg-white rounded-lg shadow-sm p-4 flex flex-col items-center"
        >
          <img
            src={f.profile_photo || DEFAULT_AVATAR}
            alt={f.username || f._id}
            className="w-20 h-20 rounded-full object-cover mb-2"
          />
          <p className="font-medium">{f.username || f._id}</p>
        </div>
      ))}
    </div>
  );
};

const UserProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [isFollowing, setIsFollowing] = useState(false);

  const { data, isLoading, error } = useQueryHandler({
    url: `user/by_id/${id}`,
    pathname: `user-profile-${id}`,
  });

  if (isLoading) return <Skeleton active avatar paragraph={{ rows: 4 }} />;
  if (error || !data)
    return <div className="p-10 text-center text-red-500">User not found!</div>;

  const user = data as UserProfileType;

  const tabItems: TabsProps["items"] = [
    { key: "about", label: "About", children: <AboutTab user={user} /> },
    {
      key: "products",
      label: "Products",
      children: <ProductsTab userId={id!} />,
    },
    { key: "posts", label: "Posts", children: <PostsTab userId={id!} /> },
    { key: "likes", label: "Likes", children: <LikesTab userId={id!} /> },
    {
      key: "followers",
      label: `Followers (${user.followers?.length || 0})`,
      children: (
        <FollowersTab followerIds={user.followers} currentUser={user} />
      ),
    },
  ];

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    message.success(isFollowing ? "Unfollowed" : "Followed successfully");
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white shadow-sm pb-4">
        <div
          className="h-48 md:h-64 w-full bg-cover bg-center relative"
          style={{ backgroundImage: `url(${user.cover_photo || coverImg})` }}
        >
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        <div className="max-w-[1550px] w-[90%] mx-auto relative px-4">
          <div className="flex flex-col md:flex-row items-center md:items-end -mt-16 mb-6 gap-6">
            <div className="relative">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-[5px] border-white shadow-lg overflow-hidden bg-white">
                <img
                  src={user.profile_photo || DEFAULT_AVATAR}
                  alt={user.username}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="flex-1 text-center md:text-left mb-2 md:mb-0">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                {user.name} {user.surname}
              </h1>
              <p className="text-gray-500 font-medium text-sm md:text-base">
                @{user.username}
              </p>
              <p className="text-green-600 text-sm font-semibold mt-1">
                {user.user_type || "DEVELOPER"}
              </p>
            </div>

            <div className="flex gap-3 mb-4 md:mb-2">
              <Button
                type="primary"
                onClick={handleFollow}
                className={`flex items-center gap-2 h-10 px-6 rounded-md font-medium shadow-none transition-all ${
                  isFollowing
                    ? "bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200"
                    : "bg-[#46A358] hover:bg-[#357c44] text-white"
                }`}
              >
                {isFollowing ? (
                  <span className="flex items-center gap-1">
                    <FaCheck className="text-[14px] leading-none" /> Following
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    <FaUserPlus className="text-[14px] leading-none" /> Follow
                  </span>
                )}
              </Button>

              <Button className="flex items-center gap-2 h-10 px-6 rounded-md border-gray-300 text-gray-700 hover:text-[#46A358] hover:border-[#46A358]">
                <FaEnvelope /> Message
              </Button>
            </div>
          </div>

          <div className="flex justify-center md:justify-start gap-8 md:gap-12 border-t pt-4 text-sm md:text-base">
            <div className="text-center md:text-left cursor-pointer hover:text-[#46A358] transition">
              <span className="font-bold text-gray-900 block text-lg">
                {user.followers?.length || 0}
              </span>
              <span className="text-gray-500">Followers</span>
            </div>
            <div className="text-center md:text-left cursor-pointer hover:text-[#46A358] transition">
              <span className="font-bold text-gray-900 block text-lg">
                {user.following?.length || 0}
              </span>
              <span className="text-gray-500">Following</span>
            </div>
            <div className="text-center md:text-left cursor-pointer hover:text-[#46A358] transition">
              <span className="font-bold text-gray-900 block text-lg">
                {user.wishlist?.length || 0}
              </span>
              <span className="text-gray-500">Favorites</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1550px] w-[90%] mx-auto mt-8">
        <Tabs
          defaultActiveKey="about"
          items={tabItems}
          size="large"
          className="custom-profile-tabs"
          tabBarStyle={{
            marginBottom: "24px",
            borderBottom: "1px solid #e5e7eb",
          }}
        />
      </div>
    </div>
  );
};

export default UserProfile;
