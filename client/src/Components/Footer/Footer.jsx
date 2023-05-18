import { Box, useMediaQuery, useTheme } from "@mui/material";
import { styled } from "@mui/system";
import { motion } from "framer-motion";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LinkIcon from "@mui/icons-material/Link";
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';

const IconButton = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  width: "auto",
  height: "auto",
  padding: theme.spacing(1),
  borderRadius: "50%",
  backgroundColor: "transparent",
  transition: "background-color 0.3s",

  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
}));

const iconVariants = {
  hover: { scale: 1.2, rotate: 360 },
  tap: { scale: 0.95 },
};

export default function Footer(props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const iconProps = {
    whileHover: "hover",
    whileTap: "tap",
    variants: iconVariants,
  };

  return (
    <Box
      bgcolor="#151515"
      padding={1}
      justifyContent="center"
      display="flex"
      gap={isMobile ? "3%" : "5%"}
    >
      <IconButton
        component={motion.a}
        href="https://aquiestoy.chat/"
        target="_blank"
        {...iconProps}
      >
        <VolunteerActivismIcon htmlColor="#00C8B2" />
      </IconButton>
      <IconButton
        component={motion.a}
        href="https://www.facebook.com/aquiestoy.chat"
        target="_blank"
        {...iconProps}
      >
        <FacebookIcon htmlColor="#1877F2" />
      </IconButton>
      <IconButton
        component={motion.a}
        href="https://www.instagram.com/aquiestoy.chat/"
        target="_blank"
        {...iconProps}
      >
        <InstagramIcon htmlColor="#E1306C" />
      </IconButton>
      <IconButton
        component={motion.a}
        href="https://wa.me/5491151993599"
        target="_blank"
        {...iconProps}
      >
        <WhatsAppIcon htmlColor="#25D366" />
      </IconButton>
      <IconButton
        component={motion.a}
        href="https://linktr.ee/aquiestoy"
        target="_blank"
        {...iconProps}
      >
        <LinkIcon htmlColor="#F0F0F0" />
      </IconButton>
    </Box>
  );
}
