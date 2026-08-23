import styles from "./Avatar.module.css"

interface AvatarProps {
  name: string
}

export default function Avatar({ name }: AvatarProps) {
  // Extract uppercase letters from the name
  const uppercaseLetters = name.match(/[A-Z]/g) || []

  // Take first 12 uppercase letters (or fewer if there aren't 12)
  const initials = uppercaseLetters.slice(0, 12).join("")

  return (
    <div className={styles.avatar} role="img" aria-label={`Avatar for ${name}`}>
      {initials}
    </div>
  )
}
