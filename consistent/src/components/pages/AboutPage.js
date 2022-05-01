import Container from "@mui/material/Container"
import Box from "@mui/material/Box"

function AboutPage(){
    return (
        <Container maxWidth="100%">
            <Box>
                <p>Consistent helps you analyse drafts of contracts, policy papers, 
                    laws, reports to highlight points of inconsistency so that they 
                    can be addressed early on during the drafting process.</p>
                <p>Consistent is a tool developed by SiMULA. All Rights are reserved.</p>

                <p>Latest commit data: {} </p>
            </Box>
        </Container>
    );
}


export default AboutPage;