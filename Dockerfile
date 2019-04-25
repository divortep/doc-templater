FROM python:3.7-alpine
ENV PYTHONUNBUFFERED 1

ARG DEBUG
ENV DJANGO_DEBUG=${DEBUG}

RUN mkdir /app
COPY requirements.txt /app
WORKDIR /app
RUN apk add --no-cache postgresql-libs postgresql-client python-dev libxml2-dev libxslt-dev && \
    apk add --no-cache --virtual .build-deps gcc musl-dev postgresql-dev && \
    python -m pip install -r requirements.txt --no-cache-dir && \
    apk --purge del .build-deps

COPY . .

COPY --from=doc_templater_frontend:latest /home/node/app/webpack-stats.json /app/frontend/
COPY --from=doc_templater_frontend:latest /home/node/app/dist/ /app/dist