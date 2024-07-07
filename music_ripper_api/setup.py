from setuptools import setup, find_packages
from pathlib import Path
from typing import List
import re
import os

ROOT_PATH = Path(os.path.dirname(os.path.abspath(__file__))).resolve()
REQUIREMENTS_PATH = Path(ROOT_PATH, "requirements.txt")
# Load requirements from a file name in local directory
def parse_requirements(requirements: Path) -> List[str]:
    with requirements.open(mode="r") as fd:

        rlist_sans_comments = [
            line.strip()
            for line in fd.read().split("\n")
            if (line.strip() or line.strip().startswith("#"))
        ]

        final_rlist = [
            line
            if not re.match(
                pattern=r"^https?://.*$",
                string=line)
            else re.sub(
                pattern=r"(.*(?:https?://.*/)([a-zA-Z0-9_].*)[-]([a-zA-Z0-9.]*)([.]tar[.]gz|[.]tgz).*)",
                repl=r"\2 @ \1",
                string=line
            )
            for line in rlist_sans_comments
        ]

    return final_rlist

setup(name='src',
      version='1.0',
      description='src 1.0',
      packages=find_packages(),
      install_requires=parse_requirements(REQUIREMENTS_PATH)
     )