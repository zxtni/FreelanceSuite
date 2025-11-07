"use client"

import ProfileCard from "./ProfileCard"

export function ProfileSettings() {
  return (
    <div className="flex justify-center items-center min-h-[600px]">
      <ProfileCard
        name="Rahul Mondal"
        title="Senior Freelancer"
        handle="zxtni"
        status="Online"
        contactText="Contact"
        avatarUrl="https://api.dicebear.com/9.x/adventurer/svg?seed=Jocelyn"
        showUserInfo={true}
        enableTilt={true}
        enableMobileTilt={false}
        onContactClick={() => console.log('Contact clicked')}
      />
    </div>
  )
}
