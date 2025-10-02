from diagrams import Diagram, Cluster, Edge
from diagrams.aws.network import ELB
from diagrams.onprem.client import Users
from diagrams.onprem.compute import Server
from diagrams.onprem.inmemory import Redis
from diagrams.onprem.database import PostgreSQL
from diagrams.onprem.queue import Kafka

with Diagram("High Load Payment System", show=False, direction="LR"):

    users = Users("Clients\n(Mobile/Web)")

    lb = ELB("Load Balancer")

    with Cluster("Servers (Stateless)"):
        api1 = Server("Server 1")
        api2 = Server("Server 2")
        api3 = Server("Server 3")

    cache = Redis("Redis Cache\n(for caching, session, reduce DB load)")
    mq = Kafka("Kafka Queue\n(for async processing)")

    with Cluster("Database Cluster"):
        master = PostgreSQL("Master DB\n(for writes, transactions)")
        replica1 = PostgreSQL("Read Replica 1\n(for read-heavy queries)")
        replica2 = PostgreSQL("Read Replica 2\n(for read-heavy queries)")

    # connections
    users >> lb >> [api1, api2, api3]
    [api1, api2, api3] >> cache
    [api1, api2, api3] >> mq
    [api1, api2, api3] >> master
    [api1, api2, api3] >> replica1
    [api1, api2, api3] >> replica2