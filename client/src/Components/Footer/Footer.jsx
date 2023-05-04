import { Box, useMediaQuery, useTheme } from "@mui/material";
import { styled } from "@mui/system";
import { motion } from "framer-motion";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LinkIcon from "@mui/icons-material/Link";

const IconButton = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  color: "#00C8B2",
  width: "auto",
  height: "auto",
  padding: theme.spacing(1),
  borderRadius: "50%",
  backgroundColor: "transparent",
  transition: "background-color 0.3s",

  "&:hover": {
    backgroundColor: "rgba(0, 200, 178, 0.1)",
  },
}));

const iconVariants = {
  hover: { scale: 1.2 },
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
        <FacebookIcon />
      </IconButton>
      <IconButton
        component={motion.a}
        href="https://www.instagram.com/aquiestoy.chat/"
        target="_blank"
        {...iconProps}
      >
        <InstagramIcon />
      </IconButton>
      <IconButton
        component={motion.a}
        href="https://wa.me/5491151993599"
        target="_blank"
        {...iconProps}
      >
        <WhatsAppIcon />
      </IconButton>
      <IconButton
        component={motion.a}
        href="https://linktr.ee/aquiestoy"
        target="_blank"
        {...iconProps}
      >
        <LinkIcon />
      </IconButton>
    </Box>
  );
}