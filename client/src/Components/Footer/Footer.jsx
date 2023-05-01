import { Box, Grid, ButtonGroup, Button } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LinkIcon from "@mui/icons-material/Link";

export default function Footer(props) {
  return (
    <Box
      bgcolor="#151515"
      padding={1}
      justifyContent="center"
      display="flex"
      gap="5%"
    >
      <Button style={{ color: "#00C8B2" }} href="https://aquiestoy.chat/" target="_blank">
        <FacebookIcon />
      </Button>
      <Button style={{ color: "#00C8B2" }} href="https://www.instagram.com/aquiestoy.chat/" target="_blank">
        <InstagramIcon />
      </Button>
      <Button style={{ color: "#00C8B2" }} href="https://wa.me/5491151993599" target="_blank">
        <WhatsAppIcon />
      </Button>
      <Button style={{ color: "#00C8B2" }} href="https://linktr.ee/aquiestoy" target="_blank">
        <LinkIcon />
      </Button>
    </Box>
  );
}
