"use client";

import Image from "next/image";
import { urlFor } from "@/lib/sanity";
import type { TeamMemberData } from "@/types/sanity";
import { User, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { getImageUrl, isCloudinaryAsset } from "@/lib/cloudinary-helpers";

interface TeamMemberCardProps {
  member: TeamMemberData;
  className?: string;
}

// Fallback avatar URL
const FALLBACK_AVATAR_URL = "https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=200&h=200&fit=crop&crop=face";

export function TeamMemberCard({ member, className }: TeamMemberCardProps) {
  // Handle both Sanity and Cloudinary image objects
  let imageUrl = FALLBACK_AVATAR_URL;
  
  if (member.image) {
    if (isCloudinaryAsset(member.image)) {
      // It's a Cloudinary image
      imageUrl = getImageUrl(member.image, { width: 200, height: 200, crop: 'fill' }) || FALLBACK_AVATAR_URL;
    } else if (member.image._type === 'image' || member.image._type === 'sanity.imageAsset') {
      // It's a standard Sanity image
      imageUrl = urlFor(member.image).width(200).height(200).url();
    }
  }

  const displayName = member.name || "Team Member";
  const displayRole = member.role || "Creative Professional";
  const displayBio = member.bio || "A talented member of the Shubz Entertainment team contributing to creative excellence.";
  const hasSocialLinks = member.socialLinks && member.socialLinks.length > 0;
  
  return (
    <div className={cn("group relative", className)}>
      <div className="bg-card text-card-foreground rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-border/50">
        <div className="relative mb-4">
          <div className="relative h-32 w-32 mx-auto overflow-hidden rounded-full bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900">
            <Image
              src={imageUrl}
              alt={displayName}
              width={200}
              height={200}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              onError={(e) => {
                console.warn(`Failed to load image for team member: ${displayName}`);
                (e.target as HTMLImageElement).src = FALLBACK_AVATAR_URL;
              }}
            />
          </div>
          
          {(!member.name || !member.role || !member.image) && (
            <div className="absolute -top-2 -right-2 bg-yellow-500 text-white rounded-full p-1">
              <AlertTriangle className="w-3 h-3" />
            </div>
          )}
        </div>

        <div className="text-center space-y-3">
          <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
            {displayName}
          </h3>
          <p className="text-sm text-muted-foreground font-medium">
            {displayRole}
          </p>
          {displayBio && (
            <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
              {displayBio}
            </p>
          )}
          <div className="pt-2 space-y-1">
            {member.email && (
              <a 
                href={`mailto:${member.email}`}
                className="text-xs text-primary hover:underline block"
              >
                {member.email}
              </a>
            )}
            {member.phone && (
              <a 
                href={`tel:${member.phone}`}
                className="text-xs text-muted-foreground hover:underline block"
              >
                {member.phone}
              </a>
            )}
          </div>
        </div>

        {hasSocialLinks && (
          <div className="mt-4 flex justify-center space-x-2">
            {member.socialLinks?.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                aria-label={link.platform || "Social link"}
              >
                <span className="text-xs">{link.platform || "Link"}</span>
              </a>
            ))}
          </div>
        )}

        <div className="mt-4 flex justify-center space-x-2">
          {member.email && (
            <a
              href={`mailto:${member.email}`}
              className="px-3 py-1 text-xs bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors"
            >
              Contact
            </a>
          )}
          {member.linkedIn && (
            <a
              href={member.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 text-xs border border-primary text-primary rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              LinkedIn
            </a>
          )}
        </div>
      </div>

      {process.env.NODE_ENV === 'development' && (!member.name || !member.role || !member.image) && (
        <div className="mt-2 p-2 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
          <p className="text-xs text-yellow-700 dark:text-yellow-300">
            ⚠️ Missing data for team member: {!member.name && "Name "}{!member.role && "Role "}{!member.image && "Image "}
          </p>
        </div>
      )}
    </div>
  );
}