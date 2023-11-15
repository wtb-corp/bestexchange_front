import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import axios from 'axios';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

const ResultList = ({ from, to }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [expanded, setExpanded] = React.useState(false);

    const apiUrl = `https://wttonline.ru/api/directions?valute_from=${from}&valute_to=${to}`;

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    useEffect(() => {
        axios.get(apiUrl)
            .then((res) => {
                setData(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching data:", err);
                setLoading(false);
                // Set state to indicate an error
            });
    }, [apiUrl]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!data) {
        return <p>Error loading data. Please try again later.</p>;
    }

    const boxStyles = {
        background: "#fdfdfd",
        textAlign: "center",
        fontSize: "24px",
        position: "relative",
    };

    return (
        <>
            {data.map((d) => (
                <Card key={d.id} sx={{ m: 2 }}>
                    <CardHeader
                        avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                            R
                        </Avatar>
                        }
                        action={
                        <IconButton aria-label="settings">
                            <FavoriteIcon />
                        </IconButton>
                        }
                        title={d.name}
                        subheader="September 14, 2016"
                    />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            ДОСТУПНО ДЛЯ ОБМЕНА: от {d.min_amount} до {d.max_amount} <br />
                            ПАРТНЕРСКАЯ ССЫЛКА: <a href={d.partner_link}>открывается в том-же окне</a><br /> <a target='_blank' href={d.partner_link}>открывается в новом окне</a>
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton aria-label="convertion">
                            {d.valute_from} <ArrowForwardIosIcon /> {d.valute_to}
                        </IconButton>
                        <ExpandMore
                            expand={expanded}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                        >
                        <ExpandMoreIcon />
                        </ExpandMore>
                    </CardActions>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            <Typography paragraph>Method:</Typography>
                            <Typography paragraph>
                                Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
                                medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
                                occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
                                large plate and set aside, leaving chicken and chorizo in the pan. Add
                                pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
                                stirring often until thickened and fragrant, about 10 minutes. Add
                                saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
                            </Typography>
                            <Typography paragraph>
                                Add rice and stir very gently to distribute. Top with artichokes and
                                peppers, and cook without stirring, until most of the liquid is absorbed,
                                15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
                                mussels, tucking them down into the rice, and cook again without
                                stirring, until mussels have opened and rice is just tender, 5 to 7
                                minutes more. (Discard any mussels that don&apos;t open.)
                            </Typography>
                            <Typography>
                                Set aside off of the heat to let rest for 10 minutes, and then serve.
                            </Typography>
                        </CardContent>
                    </Collapse>
                </Card>
            ))}
        </>
    );
};

export default ResultList;