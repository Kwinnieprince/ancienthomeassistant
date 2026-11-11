# The focus-test workflow builds this image from this branch, never from latest.
FROM docker.io/kwintend/ancienthomeassistant:focus-test
USER root
COPY run.py /addon/run.py
ENTRYPOINT ["python", "/addon/run.py"]
CMD []
