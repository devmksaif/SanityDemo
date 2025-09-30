"use client";

import Image from "next/image";
import { urlFor } from "@/lib/sanity";
import type { TeamMemberData } from "@/types/sanity";
import { User, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface TeamMemberCardProps {
  member: TeamMemberData;
  className?: string;
}

// Fallback avatar URL
const FALLBACK_AVATAR_URL = "https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=200&h=200&fit=crop&crop=face";

export function TeamMemberCard({ member, className }: TeamMemberCardProps) {
  // Robust image handling with multiple fallbacks
  const imageUrl = member.image 
    ? urlFor(member.image).width(200).height(200).url()
    : FALLBACK_AVATAR_URL;

  // Handle missing name with fallback
  const displayName = member.name || "Team Member";
  
  // Handle missing role with fallback
  const displayRole = member.role || "Creative Professional";
  
  // Handle missing bio with fallback
  const displayBio = member.bio || "A talented member of the Shubz Entertainment team contributing to creative excellence.";
  
  // Handle missing social links
  const hasSocialLinks = member.socialLinks && member.socialLinks.length > 0;
  
  return (
    <div className={cn("group relative", className)}>
      <div className="bg-card text-card-foreground rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-border/50">
        {/* Image Section with Error Handling */}
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
                // Fallback to user icon if image fails
                (e.target as HTMLImageElement).style.display = 'none';
                (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
              }}
            />
            {/* Fallback icon when image fails */}
            <div className="hidden absolute inset-0 flex items-center justify-center">
              <User className="w-12 h-12 text-purple-400" />
            </div>
            
            {/* Placeholder gradient when no image */}
            {!member.image && (
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">
                  {displayName.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
          </div>
          
          {/* Status indicator for missing data */}
          {(!member.name || !member.role || !member.image) && (
            <div className="absolute -top-2 -right-2 bg-yellow-500 text-white rounded-full p-1">
              <AlertTriangle className="w-3 h-3" />
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="text-center space-y-3">
          {/* Name with validation */}
          <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
            {displayName}
          </h3>
          
          {/* Role with validation */}
          <p className="text-sm text-muted-foreground font-medium">
            {displayRole}
          </p>
          
          {/* Bio with validation and truncation */}
          {displayBio && (
            <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
              {displayBio}
            </p>
          )}
          
          {/* Contact info with validation */}
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

        {/* Social Links with validation */}
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
                {/* You can add platform-specific icons here */}
                <span className="text-xs">{link.platform || "Link"}</span>
              </a>
            ))}
          </div>
        )}

        {/* Action buttons with validation */}
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

      {/* Debug information for development */}
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