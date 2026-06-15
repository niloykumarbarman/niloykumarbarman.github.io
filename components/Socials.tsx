import Link from 'next/link';
import { FaGithub, FaLinkedinIn, FaMedium, FaStackOverflow } from "@/lib/icons";

interface SocialsProps {
    containerStyles: string;
    iconStyles: string;
}

const SOCIAL_LINKS = {
    github: 'https://github.com/niloykumarbarman',
    linkedin: 'https://www.linkedin.com/in/niloykumarbarman',
    medium: 'https://medium.com/@niloykumarbarman',
    stackoverflow: 'https://stackoverflow.com/users/your-id/niloykumarbarman'
};

const Socials = ({ containerStyles, iconStyles }: SocialsProps) => {
    const socials = [
        { icon: <FaGithub />, path: SOCIAL_LINKS.github, label: 'Visit GitHub profile' },
        { icon: <FaLinkedinIn />, path: SOCIAL_LINKS.linkedin, label: 'Visit LinkedIn profile' },
        { icon: <FaMedium />, path: SOCIAL_LINKS.medium, label: 'Visit Medium profile' },
        { icon: <FaStackOverflow />, path: SOCIAL_LINKS.stackoverflow, label: 'Visit StackOverflow profile' },
    ];

    return (
        <div className={containerStyles}>
            {socials.map((item, index) => (
                <Link
                    key={index}
                    href={item.path}
                    aria-label={item.label}
                    className={iconStyles}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {item.icon}
                </Link>
            ))}
        </div>
    );
};

export default Socials;
