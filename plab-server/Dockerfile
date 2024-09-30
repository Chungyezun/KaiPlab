FROM python:3.9

WORKDIR /plab-server

COPY ./requirements.txt /plab-server/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /plab-server/requirements.txt

COPY . /plab-server

ENV PYTHONPATH=/plab-server

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]