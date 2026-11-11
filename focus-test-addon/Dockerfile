# The focus-test workflow builds this image from this branch, never from latest.
FROM ghcr.io/kwinnieprince/ancienthomeassistant:focus-test
USER root
COPY run.py /addon/run.py
ENTRYPOINT ["python", "/addon/run.py"]
CMD []
