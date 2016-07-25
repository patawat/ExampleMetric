library('modeltools')
library('archetypes')

d1 = read.csv('~/Desktop/ExampleMetric/result.csv')
d1[is.na(d1)] <- 0
d1[d1$Rule5 == '', ] <- 0
#d1$Rule5 <- as.numeric(d1$Rule5)
#d2 <- d1[1:10, ]
View(d1)

#d3 = read.csv('~/Desktop/Test4.csv')
#d3[is.na(d1)] <- 0
#d3[d1$Rule5 == '', ] <- 0
#d3$Rule5 <- as.numeric(d3$Rule5)
#d4 <- d3[1:1, ]
#View(d4)

pcplot(d1)

set.seed(1981)

as <- stepArchetypes(d1, k = 1:15, verbose = FALSE, nrep = 3)
screeplot(as)
a3 <- bestModel(as[[2]])
rss(as[2])
a3
t(parameters(a3))

simplexplot(a3)

barplot(a3, d2, percentage = TRUE)
pcplot(a3, d2, data.col = as.numeric(skel$Gender))
predict(a3, d4)
save(a3, file = "my_model1.rda")