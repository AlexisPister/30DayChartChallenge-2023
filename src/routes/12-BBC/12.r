pacman::p_load('dplyr', 'tidyr', 'gapminder',
               'ggplot2',  'ggalt',
               'forcats', 'R.utils', 'png', 
               'grid', 'ggpubr', 'scales', 'usethis', 'pkgdown',
               'rcmdcheck', 'bbplot', 'rversions', 'urlchecker', "ggtext")
install.packages('devtools')
devtools::install_github('bbc/bbplot')

### TESTS

#Data for chart from gapminder package
line_df <- gapminder %>%
  filter(country == "Malawi") 

#Make plot
line <- ggplot(line_df, aes(x = year, y = lifeExp)) +
  geom_line(colour = "#1380A1", size = 1) +
  geom_hline(yintercept = 0, size = 1, colour="#333333") +
  bbc_style() +
  labs(title="Living longer",
       subtitle = "Life expectancy in Malawi 1952-2007")



#Prepare data
dumbbell_df <- gapminder %>%
  filter(year == 1967 | year == 2007) %>%
  select(country, year, lifeExp) %>%
  spread(year, lifeExp) %>%
  mutate(gap = `2007` - `1967`) %>%
  arrange(desc(gap)) %>%
  head(10)

#Make plot
ggplot(dumbbell_df, aes(x = `1967`, xend = `2007`, y = reorder(country, gap), group = country)) + 
  geom_dumbbell(colour = "#dddddd",
                size = 3,
                colour_x = "#FAAB18",
                colour_xend = "#1380A1") +
  bbc_style() + 
  labs(title="We're living longer",
       subtitle="Biggest life expectancy rise, 1967-2007")


### PLOT 

df = read.csv("/home/alexis/Projets/30DayChartChallenge-2023/static/data/12/DP_LIVE_17042023230210260.csv")

dumbbell_df2 <- df %>%
  filter(TIME == 1971 | TIME == 2021) %>%
  select(LOCATION, TIME, Value) %>%
  spread(TIME, Value) %>%
  mutate(gap = `2021` - `1971`) %>%
  arrange(desc(gap)) %>%
  head(14) %>%
  mutate(LOCATION = recode(LOCATION, SWE = 'Sweden', CAN = 'Canada', GBR =  'United Kingdom', PRT = "Portugal", NLD = "Netherlands", FIN = "Finland", NOR = "Norway", BEL = "Belgium", DNK = "Denmark", ISL = "Iceland", FRA = "France", IRL = "Ireland"))

#Make plot
ggplot(dumbbell_df2, aes(x = `1971`, xend = `2021`, y = reorder(LOCATION, gap), group = LOCATION)) + 
  geom_dumbbell(colour = "#dddddd",
                size = 3,
                colour_x = "#d6604d",
                colour_xend = "#4393c3") + 
  scale_x_reverse() +
  bbc_style() + 
  labs(title="We are working less",
       subtitle="Average annual hours worked in OECD countries, <span style='color:#d6604d'>1971</span>-<span style='color:#4393c3'>2021</span>") +
  theme(
    plot.subtitle = element_markdown(lineheight = 1.1)
  ) 

#Default theme
ggplot(dumbbell_df2, aes(x = `1971`, xend = `2021`, y = reorder(LOCATION, gap), group = LOCATION)) + 
  geom_dumbbell(colour = "#dddddd",
                size = 3,
                colour_x = "#d6604d",
                colour_xend = "#4393c3") + 
  scale_x_reverse() +
  labs(title="We are working less",
       subtitle="Average annual hours worked in OECD countries, <span style='color:#d6604d'>1971</span>-<span style='color:#4393c3'>2021</span>") +
  theme(
    title = element_markdown(size = 25),
    plot.subtitle = element_markdown(size = 16, lineheight = 1.1),
    axis.title.x=element_blank(),
    axis.title.y=element_blank()
  ) 
